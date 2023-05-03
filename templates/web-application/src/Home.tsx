export interface HomeProps {
    title?: string;
}

export function Home({ title = "Welcome Home!" }: HomeProps) {
    return (
        <>
            <h1>{title}</h1>
            <div>
                Home is the place where you feel the most confortable.<br />
                Home is the place where you hang with your loves one.<br />
                Home is the place where you wear sweatpants all day!<br />
            </div>
        </>
    );
}
