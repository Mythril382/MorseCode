let inFormat = false;

const morse = {
   "A": "•-",
   "B": "-•••",
   "C": "-•-•",
   "D": "-••",
   "E": "•",
   "F": "••-•",
   "G": "--•",
   "H": "••••",
   "I": "••",
   "J": "•---",
   "K": "-•-",
   "L": "•-••",
   "M": "--",
   "N": "-•",
   "O": "---",
   "P": "•--•",
   "Q": "--•-",
   "R": "•-•",
   "S": "•••",
   "T": "-",
   "U": "••-",
   "V": "•••-",
   "W": "•--",
   "X": "-••-",
   "Y": "-•--",
   "Z": "--••"
};

function convert(str){
    return str.toUpperCase().split("").map(char => {
        if(char == "[" || char == "{") inFormat = true;
        else if(char == "]" || char == "}") inFormat = false;
        if(inFormat) return char;
        return morse[char] ? morse[char] : char;
    }).join("");
}

Events.on(ClientLoadEvent, e => {
    if(Core.settings.getString("locale") == "en"){
        const bundleCopy = Core.bundle.getProperties().copy();
        Core.bundle.getProperties().each((k, v) => {
            const newV = convert(v);
            bundleCopy.put(k, newV);
        });
        Core.bundle.setProperties(bundleCopy);
        Vars.content.each(c => {
            if(!(c instanceof UnlockableContent)) return;
            c.localizedName = convert(c.localizedName);
            if(c.description != null) c.description = convert(c.description);
            if(c.details != null) c.details = convert(c.details);
        });
    }
});
