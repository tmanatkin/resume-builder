export function removeMdHtmlComments(markdown) {
  return markdown.replace(/<!--[\s\S]*?-->/g, "");
}
