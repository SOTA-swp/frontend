"use client";
import TextField from "@/components/TextField";
import { useRef, useState } from "react";
import MainViewController from "../../_components/MainViewController";
import { SIDE_VIEWS } from "../../_components/side/sideStore";
import { useRouter, useSearchParams } from "next/navigation";
import IconButton from "@/components/IconButton";
import { MdSearch } from "react-icons/md";
import PATH from "@/consts/PATH";

function SearchField() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const ref = useRef(null);
  const [term, setTerm] = useState(searchParams.get("q") || "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams();
    if (term) {
      query.append("q", term);
    }
    router.push(`${PATH.SEARCH}?${query.toString()}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      ref={ref}
      className="w-full max-w-175 flex items-center gap-2">
      <MainViewController
        ref={ref}
        viewId={SIDE_VIEWS.SEARCH}
        rootMargin="0px 0px 0px 0px"
      />
      <TextField
        value={term}
        onChange={handleChange}
        label="q"
        labelName="検索"
        placeholder="沖縄旅行"
        autoComplete="off"
        fullWidth
      />
      <IconButton
        type="submit"
        title="検索"
        icon={<MdSearch />}
        variant={"iconOnly"}
        color={"gray"}
      />
    </form>
  );
}

export default SearchField;
