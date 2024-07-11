import React, { useState, useRef, useEffect } from "react";

const Array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const ScrollableContainer = ({ children }) => {
    const [click, setClick] = useState(false);

    const Ref = useRef();

    useEffect(() => {
        if (!Ref.current) return;
        let isDown = false;
        let startX;
        let scrollLeft;

        Ref.current.addEventListener("mousedown", (e) => {
            isDown = true;
            setClick(true);
            startX = e.pageX - Ref.current.offsetLeft;
            scrollLeft = Ref.current.scrollLeft;
        });
        Ref.current.addEventListener("mouseleave", () => {
            isDown = false;
            setClick(false);
        });
        Ref.current.addEventListener("mouseup", () => {
            isDown = false;
            setClick(false);
        });
        Ref.current.addEventListener("mousemove", (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - Ref.current.offsetLeft;
            const walk = x - startX;
            Ref.current.scrollLeft = scrollLeft - walk;
        });
    }, [Ref]);

    return (
        <div className="App">
            <div
                style={{
                    display: "flex",
                    overflow: "scroll",
                    transform: click ? "scale(1)" : "scale(0.98)",
                    transition: "all .2s ease"
                }}
                ref={Ref}
            >
                {children}
            </div>
        </div>
    );
}
