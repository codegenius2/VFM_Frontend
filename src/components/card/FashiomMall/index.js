import React, { useState, useRef, useEffect } from "react";
import { virtual_fashion_mall } from "../../../constant/fashion_mall";

export const FashiomMall = () => {
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

    return (<div
        className="flex overflow-x-scroll overflow-y-hidden  items-center bg-blue-700 py-7 scroll-div"
        style={{
            transform: click ? "scale(1)" : "scale(0.98)",
            transition: "all .2s ease"
        }}
        ref={Ref}
    >
        {virtual_fashion_mall.map((item, index) => (
            <div className="w-246 flex-shrink-0" draggable="false" key={index}>
                <img className="w-full max-h-60" src={item.image} alt="wait" draggable={false} />
            </div>))
        }
    </div >);

};
