export  const downFile =(fileName:string,fileStr: string, fileType: string)=>{
  const anchorEl = document.createElement('a');
  anchorEl.href = fileStr;
  anchorEl.download = `${fileName}.${fileType}`;
  document.body.appendChild(anchorEl); // required for firefox
  anchorEl.click();
  anchorEl.remove();
}
