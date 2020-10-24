import React, { useEffect } from "react";
import "../../styles/store.css";
import Items from "../layout/Items";
import { connect } from "react-redux";

const Store = props => {
  const { storeId } = props.match.params;

  useEffect(
    () => {
      document.title = "Welcome to - "+"name";
    },[]);

  const StoreInfo = () => (
    <div>
      <div>
        <h3>{storeId}</h3>
      </div>
      <div className="store-contains">
        <Items payload={[]} canEdit={true} />
      </div>
    </div>
  );

  const DoesNotExists = () => (
    <div className="p-5">
      <p className="text-muted" style={{ fontSize: 30 }}>
        Store Does Not Exists
      </p>
    </div>
  );

  return StoreInfo();

};

const mapStateToProps = state => ({
  cache: state.cache.store
});

export default connect(mapStateToProps)(Store);
