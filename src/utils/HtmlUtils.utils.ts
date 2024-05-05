

export class HtmlUtils {
  static getAllDivText(htmlString:string) {
    const regex = /<div[^>]*>(.*?)<\/div>/g;
    const divTextList = [];
    let match;
  
    while ((match = regex.exec(htmlString)) !== null) {
      divTextList.push(match[1].trim());
    }
  
    return divTextList;
  }
}

