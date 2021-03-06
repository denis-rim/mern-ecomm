import axios from "axios";
import { useEffect, useState } from "react";
import AccountLayout from "../components/Account/AccountLayout";
import Button from "../components/shared/Button";
import {
  NotificationModal,
  ErrorNotification,
} from "../components/shared/NotificationModal";
import baseUrl from "../utils/baseUrl";
import catchErrors from "../utils/catchErrors";

const INITIAL_PRODUCT = {
  name: "",
  price: "",
  media: "",
  description: "",
};

// TODO: Add loading spinner

function Create({ user }) {
  const [product, setProduct] = useState(INITIAL_PRODUCT);
  const [mediaPreview, setMediaPreview] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const isProduct = Object.values(product).every((el) => Boolean(el));
    isProduct ? setDisabled(false) : setDisabled(true);
  }, [product]);

  function handleChange(event) {
    const { name, value, files } = event.target;
    if (name === "media") {
      setProduct((prevState) => ({ ...prevState, media: files[0] }));
      setMediaPreview(window.URL.createObjectURL(files[0]));
    } else {
      setProduct((prevState) => ({ ...prevState, [name]: value }));
    }
  }

  async function handleImageUpload() {
    const data = new FormData();
    data.append("file", product.media);
    data.append("upload_preset", "react-mern");

    const response = await axios.post(process.env.CLOUDINARY_URL, data);
    return response.data.url;
  }

  async function handleSubmit(event) {
    try {
      event.preventDefault();
      setLoading(true);

      const mediaUrl = await handleImageUpload();
      const url = `${baseUrl}/api/product`;
      const { name, price, description } = product;
      const payload = { name, price, description, mediaUrl };
      await axios.post(url, payload);

      setProduct(INITIAL_PRODUCT);
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
      }, 4000);
    } catch (error) {
      catchErrors(error, setError);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AccountLayout user={user}>
      <form className="space-y-6 mb-4" onSubmit={handleSubmit}>
        <NotificationModal showModal={showModal} />
        {Boolean(error) && <ErrorNotification text={error} />}

        <div className="space-y-8 sm:space-y-5">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Create Product
            </h3>
          </div>

          <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Product name
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <div className="max-w-lg flex rounded-md shadow-sm">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-none rounded-md sm:text-sm border-gray-300"
                    onChange={(event) => handleChange(event)}
                    value={product.name}
                  />
                </div>
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Price
              </label>
              <div>
                <div className="mt-1 relative w-32  rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">???</span>
                  </div>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                    placeholder="0.00"
                    aria-describedby="price-currency"
                    onChange={(event) => handleChange(event)}
                    value={product.price}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span
                      className="text-gray-500 sm:text-sm"
                      id="price-currency"
                    >
                      EUR
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Description
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  className="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
                  onChange={(event) => handleChange(event)}
                  value={product.description}
                />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="cover-photo"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Product photo
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <div className="max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    {mediaPreview ? (
                      <div className="flex-shrink-0">
                        <img
                          src={mediaPreview}
                          alt="Image preview"
                          className="w-24 h-24 mb-2 rounded-md object-center object-cover sm:w-48 sm:h-48"
                        />
                      </div>
                    ) : (
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}

                    <div className="flex justify-center text-sm text-gray-600">
                      <label
                        htmlFor="media"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="media"
                          name="media"
                          type="file"
                          className="sr-only"
                          onChange={(event) => handleChange(event)}
                        />
                      </label>
                    </div>
                    {product.media && (
                      <p className="text-sm text-indigo-600">
                        {product.media.name}
                      </p>
                    )}
                    <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-5">
          <div className="flex justify-end">
            <Button
              appearance="primary"
              type="submit"
              disabled={disabled || loading}
            >
              Submit
            </Button>
          </div>
        </div>
      </form>
    </AccountLayout>
  );
}

export default Create;
