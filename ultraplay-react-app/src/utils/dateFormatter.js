export function dateFormatter(date) {
    return date.split('T').join('\n');
}

export function getTeamName(matchName) {
    return matchName.split(' - ');
}