import React from 'react';

export default function Preview({
  context,
  changedKeys,
}) {
  return (
    <pre style={{ backgroundColor: 'lightgray' }}>
      {Object.keys(context).map(key =>
        <div key={key}>
          <span
            style={{ fontWeight: changedKeys.indexOf(key) === -1 ? 'normal' : 'bold'}}
          >
            {key} = {JSON.stringify(context[key])}
          </span>
        </div>
      )}
    </pre>
  );
}

Preview.propTypes = {
  context: React.PropTypes.object.isRequired,
  changedKeys: React.PropTypes.array.isRequired,
};
