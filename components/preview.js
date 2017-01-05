import React from 'react';

export default function Preview({
  bindings,
  changedKeys,
}) {
  return (
    <pre style={{ backgroundColor: 'lightgray' }}>
      {Object.keys(bindings).map(key =>
        <div key={key}>
          <span
            style={{ fontWeight: changedKeys.indexOf(key) === -1 ? 'normal' : 'bold'}}
            >
            {key} = {JSON.stringify(bindings[key])}
          </span>
        </div>
      )}
    </pre>
  );
}

Preview.propTypes = {
  bindings: React.PropTypes.object.isRequired,
  changedKeys: React.PropTypes.array.isRequired,
};
