"use client";
import { DEFAULT_JS } from "@/lib/constants";
import useLocalStorage from "./useLocalStorage";

const useJs = () => useLocalStorage("ide.js", DEFAULT_JS);

export default useJs;