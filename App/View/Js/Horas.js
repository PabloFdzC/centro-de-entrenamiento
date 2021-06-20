function separarHoraForm(info, campo1, campo2){
  let s = info.get(campo1).split(":");
  info.delete(campo1);
  info.set(campo1, s[0]);
  info.set(campo2, s[1]);
  return info;
}