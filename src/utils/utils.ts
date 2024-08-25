export const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  console.log(document);

  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
};
