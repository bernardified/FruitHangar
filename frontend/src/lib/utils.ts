export function formatDate (date:any) {
    return date.toLocaleDateString(
        "en-US",
        {
            month:"short",
            day:"numeric",
            year:"numeric",
            hour:'2-digit',
            minute: '2-digit',
            hour12: true
        }
    )
}

//formatDate(new Date(order.createdAt))