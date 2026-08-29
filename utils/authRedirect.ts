export function getSafeRedirect(
    redirect: string | null,
    fallback = "/"
): string {

    if (
        redirect &&
        redirect.startsWith("/") &&
        !redirect.startsWith("//")
    ) {
        return redirect;
    }

    return fallback;
}