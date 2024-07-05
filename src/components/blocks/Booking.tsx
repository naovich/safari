// SearchSection.jsx

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function Booking() {
  return (
    <section className="py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold">
          Get The Best Holiday Planned By Experts!
        </h2>
        <p className="mx-auto mt-4 max-w-2xl">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Hic fuga sit
          illo modi aut aspernatur tempore laboriosam saepe dolores eveniet.
        </p>
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-4">
          <Input placeholder="Name" className="p-4" />
          <Select>
            <SelectTrigger className="p-4">
              <SelectValue placeholder="Destination" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
            </SelectContent>
          </Select>
          <Input type="date" className="p-4" />
          <Button className="bg-blue-500 hover:bg-blue-600">Submit</Button>
        </div>
      </div>
    </section>
  );
}
