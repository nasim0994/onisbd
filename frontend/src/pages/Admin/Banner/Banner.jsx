import { toast } from "react-hot-toast";
import { MdDeleteForever } from "react-icons/md";
import {
  useAddBannerMutation,
  useGetBannerQuery,
  useUpdateBannerMutation,
} from "../../../Redux/banner/banner";
import { useEffect, useState } from "react";

export default function Banner() {
  const { data } = useGetBannerQuery();
  const banner = data?.data;
  const id = banner?._id;
  const [galleries, setGalleries] = useState([]);
  const [galleriesUrl, setGalleriesUrl] = useState([]);

  useEffect(() => {
    if (banner?.galleries?.length > 0) {
      setGalleriesUrl(banner?.galleries);
    }
  }, [banner]);

  // galleries
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map((file) => ({
      label: file.name,
      file: file,
    }));

    setGalleries((prevGalleries) => [...prevGalleries, ...newImages]);
  };

  // Remove image from the gallery
  const removeImage = (index) => {
    const updatedGallery = galleries.filter((_, i) => i !== index);
    setGalleries(updatedGallery);
  };

  const removeGalleryUrl = (index) => {
    const updatedGallery = galleriesUrl?.filter((_, i) => i !== index);
    setGalleriesUrl(updatedGallery);
  };

  const [addBanner, { isLoading: addIsLoading }] = useAddBannerMutation();
  const [updateBanner, { isLoading: updateIsLoading }] =
    useUpdateBannerMutation();

  const hanldeBanner = async (e) => {
    e.preventDefault();

    const title = e.target.title.value;
    const description = e.target.description.value;

    const info = new FormData();
    info.append("title", title);
    info.append("description", description);
    if (galleries?.length > 0)
      galleries.forEach((gallery) => info.append("gallery", gallery.file));

    if (galleriesUrl?.length > 0)
      info.append("galleriesUrl", JSON.stringify(galleriesUrl));

    if (id) {
      const res = await updateBanner({ id, info });
      if (res?.data?.success) {
        toast.success("Banner Update Success");
        setGalleries([]);
      } else {
        toast.error(res?.data?.message || "something went wrong!");
        console.log(res);
      }
    } else {
      const res = await addBanner(info);
      if (res?.data?.success) {
        toast.success("Banner Add Success");
        setGalleries([]);
      } else {
        toast.error(res?.data?.message || "something went wrong!");
        console.log(res);
      }
    }
  };

  return (
    <section className="bg-base-100 rounded shadow">
      <div className="p-4 border-b">
        <h3 className="font-medium text-neutral">Banner</h3>
      </div>

      <form className="p-4" onSubmit={hanldeBanner}>
        <div className="text-neutral-content flex flex-col gap-4 w-full items-start">
          <div className="w-full">
            <p className="mb-1">Banner Title</p>
            <input
              type="text"
              name="title"
              required
              defaultValue={banner?.title}
            />
          </div>
          <div className="w-full">
            <p className="mb-1">Banner Description</p>
            <textarea
              type="text"
              name="description"
              required
              defaultValue={banner?.description}
            />
          </div>

          <div className="w-full mt-3 rounded border border-neutral/70 p-4">
            <p className="mb-2 text-sm">
              Add Gallery <small>(optional - max 10 images)</small>
            </p>

            <div className="mt-2 text-sm">
              <div className="flex flex-wrap space-x-2">
                {galleriesUrl?.length > 0 &&
                  galleriesUrl?.map((img, index) => (
                    <div
                      key={index}
                      className="relative mb-2 h-14 w-20 overflow-hidden rounded object-cover"
                    >
                      <img
                        src={
                          import.meta.env.VITE_BACKEND_URL +
                          "/banner/" +
                          img?.url
                        }
                        alt={img?.name}
                        className="h-full w-full rounded border object-cover"
                      />

                      <div
                        onClick={() => removeGalleryUrl(index)}
                        className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-black/60 text-base-100 opacity-0 duration-300 hover:text-red-500 hover:opacity-100 cursor-pointer"
                      >
                        <MdDeleteForever className="text-2xl" />
                      </div>
                    </div>
                  ))}

                {galleries?.length > 0 &&
                  galleries?.map((img, index) => (
                    <div
                      key={index}
                      className="relative mb-2 h-14 w-20 overflow-hidden rounded object-cover"
                    >
                      <img
                        src={URL.createObjectURL(img?.file)}
                        alt={img?.name}
                        className="h-full w-full rounded border object-cover"
                      />

                      <button
                        onClick={() => removeImage(index)}
                        className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-black/60 text-base-100 opacity-0 duration-300 hover:text-red-500 hover:opacity-100"
                      >
                        <MdDeleteForever className="text-2xl" />
                      </button>
                    </div>
                  ))}

                <div className="relative flex h-14 w-32 cursor-pointer items-center justify-center rounded border-2 border-dashed border-primary bg-primary/10">
                  <input
                    type="file"
                    multiple
                    className="absolute z-50 h-full w-full cursor-pointer"
                    style={{ opacity: 0, top: 0, left: 0, cursor: "pointer" }}
                    onChange={handleFileChange}
                  />

                  <span className="text-primary">+ Add more</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <div className="flex gap-2">
            <button
              disabled={addIsLoading || updateIsLoading}
              className="primary_btn"
            >
              {addIsLoading || updateIsLoading
                ? "Loading..."
                : id
                ? "Update Banner"
                : "Add Banner"}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
