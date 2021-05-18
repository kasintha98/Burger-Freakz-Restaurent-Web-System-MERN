import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProductsBySlug } from "../../actions";
import Header from "../../components/Header";

export default function ProductListPage(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    const { match } = props;

    dispatch(getProductsBySlug(match.params.slug));
  }, []);

  return (
    <div>
      <Header></Header>
    </div>
  );
}
