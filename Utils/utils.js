import moment from "moment";

export function unixToHumanDate(date)
{
  return moment.unix(date).format("DD-MM-YYYY HH:m:s");
}
export function checkName(name)
{
    if (name != null && name != undefined && name != "NullAddress") return name;
    else return "Anonymous";
}