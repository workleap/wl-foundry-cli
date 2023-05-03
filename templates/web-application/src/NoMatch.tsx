export interface NoMatchProps {
    path?: string;
}

export function NoMatch({ path = "Welcome Home!" }: NoMatchProps) {
    return (
        <>
            <h1>404</h1>
            <p>We can't find the path "{path}".</p>
        </>
    );
}
