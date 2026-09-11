export default function NotFound() {
    return (
        <div className="flex-1 flex items-center justify-center h-dvh">

            <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute top-60 sm:top-45 -left-20 sm:right-80 h-56 w-56 rounded-3xl bg-cyan-300/40 blur-xl" />
                <div className="absolute top-70 sm:top-60 sm:left-80 h-50 sm:h-80 w-50 sm:w-80 rounded-3xl bg-emerald-300/30 blur-xl rotate-20" />
                <div className="absolute top-40 left-50 h-40 w-40 rounded-3xl bg-amber-300/30 blur-xl" />
                <div className="absolute top-30 sm:top-75 left-5 sm:right-115 h-35 w-35 rounded-xl bg-rose-300/35 blur-xl rotate-6" />
                <div className="absolute top-40 left-120 h-40 w-80 rounded-3xl bg-indigo-400/30 blur-xl" />
            </div>

            <div className="w-10/12 md:w-80 px-8 py-7 bg-emerald-50/40 rounded-xl
        border-2 border-emerald-100/40 flex flex-col items-center gap-5
        backdrop-blur-sm">
                <div className="flex flex-col items-center gap-2">
                    <div className="text-5xl font-bold text-shadow-md">
                        <span className="text-emerald-800">4</span>
                        <span className="text-emerald-500">0</span>
                        <span className="text-emerald-800">4</span>
                    </div>
                    <span className="text-lg text-slate-800">صفحه <span className="text-emerald-800">مورد نظر </span>یافت نشد.</span>
                </div>
            </div>
        </div>
    )
}