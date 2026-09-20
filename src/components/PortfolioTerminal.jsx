import { useEffect, useRef, useState } from 'react';
import { FiArrowRight, FiTerminal } from 'react-icons/fi';
import { commands, runCommand } from './terminalCommands';
import './PortfolioTerminal.css';

export default function PortfolioTerminal() {
  const [input, setInput] = useState('');
  const [entries, setEntries] = useState([]);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(null);
  const [announcement, setAnnouncement] = useState('');
  const draft = useRef('');
  const inputRef = useRef(null);
  const outputRef = useRef(null);
  const nextId = useRef(0);

  useEffect(() => {
    if (outputRef.current) outputRef.current.scrollTop = outputRef.current.scrollHeight;
  }, [entries]);

  function execute(value, focusInput = false) {
    const command = value.trim();
    const result = runCommand(command);
    if (!result) return;
    setHistory(previous => [...previous, command].slice(-50));
    setHistoryIndex(null);
    draft.current = '';
    setInput('');
    const id = nextId.current++;
    setEntries(previous => result.clear ? [] : [...previous, { id, command, ...result }].slice(-40));
    setAnnouncement(result.clear ? 'Terminal cleared.' : `${command}: ${result.lines.map(line => line.text).join('\n')}`);
    if (focusInput) inputRef.current?.focus({ preventScroll: true });
  }

  function handleKeyDown(event) {
    if (event.nativeEvent.isComposing || !history.length) return;
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (historyIndex === null) draft.current = input;
      const index = historyIndex === null ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(index);
      setInput(history[index]);
    } else if (event.key === 'ArrowDown' && historyIndex !== null) {
      event.preventDefault();
      const index = historyIndex + 1;
      setHistoryIndex(index < history.length ? index : null);
      setInput(index < history.length ? history[index] : draft.current);
    }
  }

  return (
    <section className="terminal-section section-shell" id="terminal" aria-labelledby="terminal-heading">
      <div className="terminal-intro">
        <div className="eyebrow"><span className="orange-slash">/</span> 03 — A DIFFERENT WAY TO EXPLORE</div>
        <h2 id="terminal-heading">Get to know me,<br /><span>one command at a time.</span></h2>
        <p>A little curiosity goes a long way. Type a command or pick one below to look around.</p>
        <div className="terminal-suggestions" role="group" aria-label="Try a terminal command">
          {commands.map(([command, description]) => (
            <button key={command} type="button" onClick={() => execute(command)} title={description} aria-label={`${command}: ${description}`}>
              <span aria-hidden="true">$</span> {command}
            </button>
          ))}
        </div>
        <p className="terminal-keyboard-hint" id="terminal-instructions"><kbd>Enter</kbd> to run <span>·</span> <kbd>↑</kbd> <kbd>↓</kbd> for history</p>
      </div>

      <div className="portfolio-terminal">
        <div className="terminal-titlebar">
          <span className="terminal-window-dots" aria-hidden="true"><i /><i /><i /></span>
          <span><FiTerminal aria-hidden="true" /> suraj@portfolio: ~</span>
          <span className="terminal-local">INTERACTIVE</span>
        </div>
        <div className="terminal-output" ref={outputRef} tabIndex={0} role="region" aria-label="Terminal output">
          <div className="terminal-welcome">
            <span className="terminal-wordmark" aria-hidden="true">&lt;st /&gt;</span>
            <p>Welcome to my corner of the internet.</p>
            <p>Type <strong>help</strong> to discover what’s here.</p>
          </div>
          {entries.map(entry => (
            <div className="terminal-entry" key={entry.id}>
              <p className="terminal-command"><span aria-hidden="true">❯</span> {entry.command}</p>
              <div className={entry.error ? 'terminal-result terminal-error' : 'terminal-result'}>
                {entry.lines.map((line, index) => (
                  <p key={index}>{line.href ? (
                    <a href={line.href} download={line.download || undefined} target={line.href.startsWith('https://') ? '_blank' : undefined} rel={line.href.startsWith('https://') ? 'noreferrer' : undefined}>{line.text}</a>
                  ) : line.text}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
        <form className="terminal-input-row" onSubmit={event => { event.preventDefault(); execute(input, true); }}>
          <label htmlFor="terminal-input"><span className="sr-only">Terminal command</span><span aria-hidden="true">❯</span></label>
          <div className="terminal-input-wrap">
            <input id="terminal-input" ref={inputRef} value={input} onChange={event => { setInput(event.target.value); setHistoryIndex(null); }} onKeyDown={handleKeyDown} placeholder="Type a command…" autoComplete="off" autoCapitalize="none" autoCorrect="off" spellCheck={false} maxLength={200} enterKeyHint="go" aria-describedby="terminal-instructions" />
            {!input && <span className="terminal-cursor" aria-hidden="true" />}
          </div>
          <button type="submit" aria-label="Run command" disabled={!input.trim()}><FiArrowRight /></button>
        </form>
        <div className="terminal-statusbar"><span><span className="status-dot" /> READY WHEN YOU ARE</span><span>PORTFOLIO SHELL · v1.0</span></div>
      </div>
      <span className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</span>
    </section>
  );
}
