"use client";
import { DEFAULT_CSS } from "@/lib/constants";
import useLocalStorage from "./useLocalStorage";

const useCss = () => useLocalStorage("ide.css", DEFAULT_CSS);

export default useCss;