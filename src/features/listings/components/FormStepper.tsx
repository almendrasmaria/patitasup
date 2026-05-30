import { Fragment } from "react";
import { FiCheck } from "react-icons/fi";

export type FormStep = {
  id: number;
  title: string;
  subtitle: string;
};

type FormStepperProps = {
  steps: FormStep[];
  current: number;
};

export default function FormStepper({ steps, current }: FormStepperProps) {
  return (
    <div role="list" className="flex items-center">
      {steps.map((step, index) => {
        const completed = step.id < current;
        const active = step.id === current;
        const connectorActive = step.id < current;

        return (
          <Fragment key={step.id}>
            <div role="listitem" className="flex items-center gap-3">
              <span
                aria-hidden
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold transition ${
                  completed
                    ? "bg-[var(--success-border)] text-white"
                    : active
                      ? "bg-[var(--accent)] text-white"
                      : "border border-[var(--border-neutral-strong)] bg-white text-[var(--neutral-400)]"
                }`}
              >
                {completed ? <FiCheck className="h-4 w-4" /> : step.id}
              </span>

              <div className="hidden min-w-0 sm:block">
                <p
                  className={`text-sm font-semibold ${
                    active || completed ? "text-[var(--foreground-inverse)]" : "text-[var(--neutral-400)]"
                  }`}
                >
                  {step.title}
                </p>
                <p className="text-xs text-[var(--neutral-500)]">{step.subtitle}</p>
              </div>
            </div>

            {index < steps.length - 1 ? (
              <div
                aria-hidden
                className={`mx-3 h-0.5 flex-1 rounded-full transition ${
                  connectorActive ? "bg-[var(--accent)]" : "bg-[var(--border-neutral)]"
                }`}
              />
            ) : null}
          </Fragment>
        );
      })}
    </div>
  );
}
