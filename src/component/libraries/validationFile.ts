export const checkValidationFile = (aaa?: File): boolean => {
  if (typeof aaa === "undefined") {
    alert("No files!!");
    return false;
  }
  if (aaa.size > 5 * 1024 * 1024) {
    //5 * 1024 * 1024==> 5MB
    alert("file is too big!!");
    return false;
  }

  if (!aaa.type.includes("jpeg") && !aaa.type.includes("png")) {
    alert("only JPEG or PNG");
    return false;
  }

  return true;
};
