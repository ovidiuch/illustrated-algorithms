import React from 'react';

export default function SourceCode({
  def,
  line,
}) {
  return (
    <pre>
      <ol>
        {def.split('\n').map((fnLine, i) =>
          <li
            key={i}
            style={{ backgroundColor: i === line - 1 ? 'yellow' : 'white' }}
          >
            {fnLine}
          </li>
        )}
      </ol>
    </pre>
  );
}

SourceCode.propTypes = {
  def: React.PropTypes.string.isRequired,
  line: React.PropTypes.number.isRequired,
};
