import { useEffect, useState } from "react";

export function TheAnswer() {
    const [response, setResponse] = useState("We don't have the response");

    useEffect(() => {
        fetch("/response-to-the-question")
            .then(res => res.json())
            .then(data => {
                setResponse(data.response);
            })
            .catch(() => {
                setResponse("We can't find the response");
            }) ;
    });

    return (
        <div>This is the response to THE question: {response}</div>
    );
}
