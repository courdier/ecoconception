"""
Lecture de la puissance électrique d'une carte graphique AMD via ADLX
(AMD Device Library eXtra), fournie avec le pilote AMD Software
(C:\\Windows\\System32\\amdadlx64.dll). Aucun droit administrateur requis.

Les positions des méthodes dans les tables virtuelles (vtables) proviennent des
en-têtes C officiels du SDK ADLX :
https://github.com/GPUOpen-LibrariesAndSDKs/ADLX/tree/main/SDK/Include
(ISystem.h, IPerformanceMonitoring.h, ADLXVersion.h 2.0.0.125).

Utilisation autonome (test) :
    python outils/mesure-ia/adlx_puissance.py
"""

import ctypes
import time
from ctypes import POINTER, byref, c_char_p, c_double, c_int, c_int64, c_uint, c_uint64, c_void_p

ADLX_OK = 0
ADLX_VERSION = (2 << 48) | (0 << 32) | (0 << 16) | 125

# Indices dans les vtables (cf. en-têtes du SDK)
SYSTEM_GET_GPUS = 1
SYSTEM_GET_PERF_SERVICES = 9
IFACE_RELEASE = 1
LIST_SIZE = 3
GPULIST_AT = 11
GPU_NAME = 7
GPU_TOTAL_VRAM = 11
PERF_GET_SAMPLING_RANGE = 3
PERF_SET_SAMPLING = 4
PERF_GET_CURRENT_GPU_METRICS = 18
METRICS_TIMESTAMP = 3
METRICS_GPU_USAGE = 4
METRICS_GPU_POWER = 9
METRICS_TOTAL_BOARD_POWER = 10


def _methode(obj, index, restype, *argtypes):
    """Retourne la méthode n° `index` de l'interface COM-like `obj`."""
    vtbl = ctypes.cast(obj, POINTER(POINTER(c_void_p)))[0]
    proto = ctypes.WINFUNCTYPE(restype, c_void_p, *argtypes)
    return lambda *args: proto(vtbl[index])(obj, *args)


class ADLXIntRange(ctypes.Structure):
    _fields_ = [("minValue", c_int), ("maxValue", c_int), ("step", c_int)]


class PuissanceGPU:
    """Accès à la puissance totale de la carte (Total Board Power) d'un GPU AMD."""

    def __init__(self, index_gpu=None, intervalle_ms=None):
        try:
            self.dll = ctypes.CDLL("amdadlx64.dll")
        except OSError as e:
            raise RuntimeError("amdadlx64.dll introuvable : pilote AMD Software requis (%s)" % e)
        init = self.dll.ADLXInitialize
        init.restype = c_int
        init.argtypes = [c_uint64, POINTER(c_void_p)]
        self.systeme = c_void_p()
        r = init(ADLX_VERSION, byref(self.systeme))
        if r != ADLX_OK:
            raise RuntimeError("ADLXInitialize a échoué (code %d)" % r)

        gpus = c_void_p()
        self._verif(_methode(self.systeme, SYSTEM_GET_GPUS, c_int, POINTER(c_void_p))(byref(gpus)), "GetGPUs")
        nb = _methode(gpus, LIST_SIZE, c_uint)()
        self.gpus_detectes = []
        for i in range(nb):
            g = c_void_p()
            self._verif(_methode(gpus, GPULIST_AT, c_int, c_uint, POINTER(c_void_p))(i, byref(g)), "At_GPUList")
            nom, vram = c_char_p(), c_uint()
            _methode(g, GPU_NAME, c_int, POINTER(c_char_p))(byref(nom))
            _methode(g, GPU_TOTAL_VRAM, c_int, POINTER(c_uint))(byref(vram))
            self.gpus_detectes.append((g, (nom.value or b"?").decode("utf-8", "replace"), vram.value))
        if not self.gpus_detectes:
            raise RuntimeError("Aucun GPU AMD détecté par ADLX")
        if index_gpu is None:
            # Par défaut : la carte dédiée, c'est-à-dire celle qui a le plus de mémoire vidéo
            choix = max(self.gpus_detectes, key=lambda x: x[2])
        else:
            choix = self.gpus_detectes[index_gpu]
        self.gpu, self.nom, self.vram_mo = choix

        self.perf = c_void_p()
        self._verif(_methode(self.systeme, SYSTEM_GET_PERF_SERVICES, c_int, POINTER(c_void_p))(byref(self.perf)),
                    "GetPerformanceMonitoringServices")
        plage = ADLXIntRange()
        _methode(self.perf, PERF_GET_SAMPLING_RANGE, c_int, POINTER(ADLXIntRange))(byref(plage))
        self.intervalle_min_ms = plage.minValue
        cible = max(plage.minValue, intervalle_ms or plage.minValue)
        _methode(self.perf, PERF_SET_SAMPLING, c_int, c_int)(cible)
        self.intervalle_ms = cible

        self._get_metrics = _methode(self.perf, PERF_GET_CURRENT_GPU_METRICS, c_int, c_void_p, POINTER(c_void_p))

    @staticmethod
    def _verif(code, quoi):
        if code != ADLX_OK:
            raise RuntimeError("%s a échoué (code ADLX %d)" % (quoi, code))

    def lire(self):
        """Renvoie (horodatage ADLX en ms, puissance carte en W, utilisation GPU en %)."""
        m = c_void_p()
        self._verif(self._get_metrics(self.gpu, byref(m)), "GetCurrentGPUMetrics")
        try:
            ts, tbp, usage = c_int64(), c_double(), c_double()
            _methode(m, METRICS_TIMESTAMP, c_int, POINTER(c_int64))(byref(ts))
            r = _methode(m, METRICS_TOTAL_BOARD_POWER, c_int, POINTER(c_double))(byref(tbp))
            if r != ADLX_OK:  # repli : puissance de la puce (ASIC) si la carte n'expose pas le TBP
                _methode(m, METRICS_GPU_POWER, c_int, POINTER(c_double))(byref(tbp))
            _methode(m, METRICS_GPU_USAGE, c_int, POINTER(c_double))(byref(usage))
            return ts.value, tbp.value, usage.value
        finally:
            _methode(m, IFACE_RELEASE, ctypes.c_long)()


if __name__ == "__main__":
    p = PuissanceGPU()
    for _g, nom, vram in p.gpus_detectes:
        print("GPU détecté :", nom, "-", vram, "Mo")
    print("GPU :", p.nom, "| VRAM :", p.vram_mo, "Mo | intervalle :", p.intervalle_ms, "ms (min", p.intervalle_min_ms, ")")
    for _ in range(10):
        print("  ts=%d ms  puissance=%.1f W  utilisation=%.0f %%" % p.lire())
        time.sleep(0.2)
