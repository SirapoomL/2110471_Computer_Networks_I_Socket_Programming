import { Fragment, useEffect, useState } from "react";
import { Button } from "@mui/material";

import "./component.css"

export default function LoginPage() {
    const chatRoomList = []
    return (
        <>
            <div>
                {/* Select Chat Room */}
                <div>
                    {chatRoomList.map((room)=><Button onClick={()=>{}}>{room.name}</Button>)}
                </div>
                {/* Chat Zone */}
                <div>
                </div>
                {/* List of People */}
                <div>
                </div>
            </div>
        </>
    )
}