import React from "react";
import { get as _get } from 'lodash'

export default ({ paragraph }) => {
  let { id, content } = paragraph,
      { name, para } = content

  return (
    <section id={para}>
      <div>
        <h3>{ name }</h3>
        <p>{ para }</p>
      </div>
    </section>
  )
};
