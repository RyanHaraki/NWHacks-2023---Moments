const GalleryItem = () => {
  return (
    <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
      <img
        src="/test.jpg"
        width="600"
        height="600"
        alt="moments nft"
        className="h-full w-full object-cover object-center group-hover:opacity-75"
      />
    </div>
  );
};

export default GalleryItem;
