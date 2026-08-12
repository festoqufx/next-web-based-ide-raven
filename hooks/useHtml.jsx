"use client";
import { DEFAULT_HTML } from "@/lib/constants";
import useLocalStorage from "./useLocalStorage";

const useHtml = () => useLocalStorage("ide.html", DEFAULT_HTML);

export default useHtml;