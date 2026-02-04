import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

interface ToolHeaderProps {
    title: string;
    onReset?: () => void;
    children?: ReactNode;
}

export const ToolHeader = ({ title, onReset, children }: ToolHeaderProps) => {
    return (
        <div className="sticky top-0 z-50 w-full mb-6 print:hidden bg-white/80 backdrop-blur-sm border-b border-slate-200 pt-4">
            <div className="container mx-auto max-w-[1180px] px-4">
                <div className="flex items-center justify-between py-2">
                    {/* Left side: Title aligned with sections */}
                    <h1 className="font-semibold text-slate-600 text-lg md:text-xl">
                        {title}
                    </h1>

                    {/* Right side: Reset button and custom buttons */}
                    {(onReset || children) && (
                        <div className="flex items-center gap-2 shrink-0">
                            {onReset && (
                                <Button
                                    variant="outline"
                                    onClick={onReset}
                                    className="flex items-center justify-center text-slate-600 hover:text-red-600 hover:border-red-200 hover:bg-red-50/50 h-9 px-2 sm:px-3 text-sm font-medium"
                                >
                                    <RotateCcw className="w-4 h-4 sm:mr-2 flex-shrink-0" />
                                    <span className="hidden sm:inline">Reset</span>
                                </Button>
                            )}
                            {children}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
