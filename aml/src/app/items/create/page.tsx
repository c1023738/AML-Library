import { pageTitleStyles } from "@/styles";
import { createItemAction } from "./actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default async function CreatePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <title>Add Item</title>
      <div className="w-full max-w-lg bg-white shadow-lg rounded-xl p-8">
        {/* Page Title */}
        <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">
          Add New Item
        </h1>

        {/* Form */}
        <form className="flex flex-col space-y-4" action={createItemAction}>
          {/* Item Name */}
          <div>
            <label className="block text-gray-600 mb-1">Item Name</label>
            <Input
              required
              name="name"
              placeholder="Enter item name"
              className="w-full"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-gray-600 mb-1">Price (in cents)</label>
            <Input
              required
              name="price"
              type="number"
              placeholder="e.g., 1500"
              className="w-full"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-gray-600 mb-1">Image URL</label>
            <Input
              required
              name="image"
              placeholder="e.g., https://example.com/image.jpg"
              className="w-full"
            />
          </div>

          {/* Item Type */}
          <div>
            <label className="block text-gray-600 mb-1">Type</label>
            <select
              required
              name="type"
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              defaultValue=""
            >
              <option value="" disabled>
                Select Type
              </option>
              <option value="book">Book</option>
              <option value="game">Game</option>
              <option value="dvd">DVD</option>
              <option value="cd">CD</option>
            </select>
          </div>

          {/* Author */}
          <div>
            <label className="block text-gray-600 mb-1">
              Author (Optional)
            </label>
            <Input
              name="author"
              placeholder="Enter author name"
              className="w-full"
            />
          </div>

          {/* Publisher */}
          <div>
            <label className="block text-gray-600 mb-1">Publisher</label>
            <Input
              required
              name="publisher"
              placeholder="Enter publisher"
              className="w-full"
            />
          </div>

          {/* Release Date */}
          <div>
            <label className="block text-gray-600 mb-1">Release Date</label>
            <Input required name="releaseDate" type="date" className="w-full" />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-600 mb-1">Description</label>
            <textarea
              required
              name="description"
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter a brief description"
              rows={4}
            ></textarea>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition duration-300"
          >
            Add Item
          </Button>
        </form>
      </div>
    </main>
  );
}
