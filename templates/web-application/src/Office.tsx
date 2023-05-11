import { TheAnswer } from "./components/TheAnswer.tsx";

export interface OfficeProps {
    title?: string;
}

export function Office({ title = "Welcome to Office!" }: OfficeProps) {
    return (
        <>
            <h1>{title}</h1>
            <div>
                Office is the place where the coffee flows and the creativity grows.<br />
                Office is the place where you can collaborate with your colleagues to achieve greatness.<br />
                Office is the place where you can turn your ideas into reality, one project at a time.<br />
            </div>
            <br />
            <TheAnswer />
        </>
    );
}
