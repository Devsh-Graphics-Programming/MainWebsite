"use client"

import { useEffect, useState } from "react"

export default function DynamicDate({date}: {date: number}) {
    const [locale, setLocale] = useState("en-US");

    useEffect(() => {
        setLocale(navigator.language)
    }, [])

    return (
        <span className="text-sm font-thin">{new Date(date * 1000).toLocaleDateString(locale)}</span>
    )
}