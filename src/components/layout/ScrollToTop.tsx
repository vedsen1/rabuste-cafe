import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        // Only scroll to top if there's no hash (anchor link)
        // This allows links like /franchise#inquiry to skip the scroll-to-top reset
        if (!hash) {
            window.scrollTo(0, 0);
        }
    }, [pathname, hash]);

    return null;
}
