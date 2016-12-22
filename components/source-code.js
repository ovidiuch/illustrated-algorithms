import React from 'react';

export default function SourceCode({
  def,
  start,
  end,
}) {
  return (
    <pre>
      <span>
        {def.slice(0, start)}
      </span>
      <span style={{ backgroundColor: 'yellow' }}>
        {def.slice(start, end)}
      </span>
      <span>
        {def.slice(end)}
      </span>
    </pre>
  );
}

SourceCode.propTypes = {
  def: React.PropTypes.string.isRequired,
  start: React.PropTypes.number.isRequired,
  end: React.PropTypes.number.isRequired,
};
