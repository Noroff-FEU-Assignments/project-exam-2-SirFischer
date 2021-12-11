
export function makeBold(input : string, needle : string) {
    return input.replace(new RegExp('(^|)(' + needle + ')(|$)','ig'), '$1<b>$2</b>$3');
}
