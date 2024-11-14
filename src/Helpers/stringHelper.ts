export const slugify = (name: string): string => {
  const randomNumber = Math.floor(Math.random() * 1000);
  let baseSlug = name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .trim();

  return `${baseSlug}-${randomNumber}`;
};
