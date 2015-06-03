Module = Module || {};
Module.TOTAL_MEMORY = 83886080; /*80Mb*/
if (typeof memoryprofiler_add_hooks !== 'undefined') { Module.preRun = [memoryprofiler_add_hooks]; } /*Hook memory profiler if defined.*/
