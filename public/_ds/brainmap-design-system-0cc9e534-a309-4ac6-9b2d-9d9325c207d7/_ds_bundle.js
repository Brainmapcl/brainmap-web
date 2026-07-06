/* @ds-bundle: {"format":3,"namespace":"BrainmapDesignSystem_0cc9e5","components":[{"name":"Avatar","sourcePath":"components/core/Avatar.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Input","sourcePath":"components/core/Input.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"Toggle","sourcePath":"components/core/Toggle.jsx"}],"sourceHashes":{"components/core/Avatar.jsx":"0cf9a315f7f1","components/core/Badge.jsx":"ce20cd4965a8","components/core/Button.jsx":"bf34a9c709cf","components/core/Card.jsx":"4d2a1ee23531","components/core/Input.jsx":"7e715ad69779","components/core/Tag.jsx":"d118c5684fe4","components/core/Toggle.jsx":"2ee550b74ed5"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.BrainmapDesignSystem_0cc9e5 = window.BrainmapDesignSystem_0cc9e5 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Avatar({
  src,
  name,
  size = 'md',
  ring = false,
  style: styleProp,
  ...rest
}) {
  const dim = {
    xs: 28,
    sm: 36,
    md: 48,
    lg: 64,
    xl: 80
  }[size] || 48;
  const initials = name ? name.trim().split(/\s+/).slice(0, 2).map(w => w[0]).join('').toUpperCase() : '?';
  const hue = name ? [...name].reduce((a, c) => a + c.charCodeAt(0), 0) % 360 : 200;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      width: dim,
      height: dim,
      borderRadius: '50%',
      overflow: 'hidden',
      flexShrink: 0,
      boxShadow: ring ? `0 0 0 2px var(--color-canvas), 0 0 0 ${dim * 0.08}px var(--color-rose-gold)` : 'var(--shadow-neumorph-sm)',
      ...styleProp
    }
  }, rest), src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name || 'avatar',
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block'
    }
  }) : /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: `oklch(89% 0.045 ${hue})`,
      fontFamily: 'var(--font-display)',
      fontSize: Math.round(dim * 0.36),
      fontWeight: 700,
      letterSpacing: '-0.02em',
      color: `oklch(36% 0.08 ${hue})`
    }
  }, initials));
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Badge({
  children,
  variant = 'default',
  dot = false,
  style: styleProp,
  ...rest
}) {
  const variants = {
    default: {
      background: 'var(--color-chrome-light)',
      color: 'var(--color-text-secondary)',
      border: '1px solid var(--color-border)'
    },
    accent: {
      background: 'var(--color-accent-subtle)',
      color: 'var(--color-accent-intense)',
      border: '1px solid var(--color-border-accent)'
    },
    chrome: {
      background: 'linear-gradient(135deg, #EFEFED 0%, #DCDCDA 50%, #EFEFED 100%)',
      color: 'var(--color-text-secondary)',
      border: '1px solid rgba(200,200,200,0.55)'
    },
    success: {
      background: 'var(--color-success-subtle)',
      color: 'var(--color-success)',
      border: '1px solid rgba(31,138,91,0.25)'
    },
    warning: {
      background: 'var(--color-warning-subtle)',
      color: 'var(--color-warning)',
      border: '1px solid rgba(217,122,32,0.25)'
    },
    error: {
      background: 'var(--color-error-subtle)',
      color: 'var(--color-error)',
      border: '1px solid rgba(201,69,69,0.25)'
    }
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '5px',
      fontFamily: 'var(--font-body)',
      fontSize: '0.6875rem',
      fontWeight: 600,
      letterSpacing: '0.04em',
      textTransform: 'uppercase',
      padding: '4px 10px',
      borderRadius: 'var(--radius-badge)',
      whiteSpace: 'nowrap',
      ...(variants[variant] || variants.default),
      ...styleProp
    }
  }, rest), dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 5,
      height: 5,
      borderRadius: '50%',
      background: 'currentColor',
      flexShrink: 0
    }
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  fullWidth = false,
  onClick,
  type = 'button',
  style: styleProp,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [pressed, setPressed] = React.useState(false);
  const sizes = {
    sm: {
      fontSize: '0.8125rem',
      padding: '8px 20px',
      gap: '6px'
    },
    md: {
      fontSize: '0.9375rem',
      padding: '13px 28px',
      gap: '8px'
    },
    lg: {
      fontSize: '1.0625rem',
      padding: '17px 36px',
      gap: '10px'
    }
  };
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'var(--font-display)',
    fontWeight: 700,
    letterSpacing: '-0.01em',
    borderRadius: 'var(--radius-button)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    border: 'none',
    outline: 'none',
    transition: 'all 220ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    width: fullWidth ? '100%' : 'auto',
    opacity: disabled ? 0.45 : 1,
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    userSelect: 'none',
    ...sizes[size]
  };
  const variants = {
    primary: {
      background: pressed ? 'var(--color-accent-intense)' : hover ? 'linear-gradient(135deg, #F5B49A 0%, #ED8462 100%)' : 'var(--color-accent)',
      color: '#FFFFFF',
      boxShadow: pressed ? 'inset 2px 2px 6px rgba(0,0,0,0.18)' : hover ? '0 8px 24px rgba(243,169,139,0.45), 0 2px 8px rgba(243,169,139,0.28)' : '0 2px 14px rgba(243,169,139,0.32)',
      transform: pressed ? 'translateY(1px)' : hover ? 'translateY(-2px)' : 'none'
    },
    secondary: {
      background: 'var(--color-canvas)',
      color: 'var(--color-text-primary)',
      boxShadow: pressed ? 'inset 4px 4px 8px rgba(0,0,0,0.08), inset -2px -2px 5px rgba(255,255,255,0.88)' : hover ? '7px 7px 16px rgba(0,0,0,0.1), -4px -4px 9px rgba(255,255,255,0.95)' : 'var(--shadow-neumorph)',
      transform: pressed ? 'translateY(0)' : hover ? 'translateY(-1px)' : 'none'
    },
    ghost: {
      background: 'transparent',
      color: hover ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
      border: '1.5px solid var(--color-border-strong)',
      boxShadow: hover ? '0 4px 16px rgba(0,0,0,0.06)' : 'none',
      transform: hover ? 'translateY(-1px)' : 'none'
    },
    accent: {
      background: 'transparent',
      color: hover ? 'var(--color-accent-intense)' : 'var(--color-accent)',
      border: '1.5px solid var(--color-border-accent)',
      boxShadow: hover ? 'var(--shadow-glow-sm)' : 'none',
      transform: hover ? 'translateY(-1px)' : 'none'
    }
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled,
    onClick: disabled ? undefined : onClick,
    onMouseEnter: () => !disabled && setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPressed(false);
    },
    onMouseDown: () => !disabled && setPressed(true),
    onMouseUp: () => setPressed(false),
    style: {
      ...base,
      ...(variants[variant] || variants.primary),
      ...styleProp
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Card({
  children,
  variant = 'default',
  padding = 'var(--card-padding)',
  hover = true,
  onClick,
  style: styleProp,
  ...rest
}) {
  const [hovered, setHovered] = React.useState(false);
  const active = hover && hovered;
  const variants = {
    default: {
      background: 'var(--color-canvas)',
      border: '1px solid rgba(255,255,255,0.8)',
      boxShadow: active ? '8px 8px 22px rgba(0,0,0,0.1), -5px -5px 11px rgba(255,255,255,0.95)' : 'var(--shadow-neumorph)'
    },
    glass: {
      background: 'var(--glass-bg)',
      backdropFilter: 'var(--glass-blur)',
      WebkitBackdropFilter: 'var(--glass-blur)',
      border: 'var(--glass-border)',
      boxShadow: active ? 'var(--shadow-lg)' : 'var(--shadow-md)'
    },
    elevated: {
      background: 'var(--color-canvas-elevated)',
      border: '1px solid var(--color-border)',
      boxShadow: active ? 'var(--shadow-lg)' : 'var(--shadow-md)'
    },
    accent: {
      background: 'var(--color-canvas)',
      border: '1.5px solid var(--color-border-accent)',
      boxShadow: active ? '0 8px 32px rgba(243,169,139,0.18), var(--shadow-neumorph)' : 'var(--shadow-neumorph)'
    },
    flat: {
      background: 'var(--color-canvas-subtle)',
      border: '1px solid var(--color-border)',
      boxShadow: 'none'
    }
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    onClick: onClick,
    style: {
      borderRadius: 'var(--radius-card)',
      padding,
      transition: 'box-shadow 300ms cubic-bezier(0.25,0.46,0.45,0.94), transform 220ms cubic-bezier(0.25,0.46,0.45,0.94)',
      transform: active ? 'translateY(-3px)' : 'none',
      cursor: onClick ? 'pointer' : 'default',
      ...(variants[variant] || variants.default),
      ...styleProp
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Input({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  hint,
  disabled = false,
  size = 'md',
  style: styleProp,
  ...rest
}) {
  const [focused, setFocused] = React.useState(false);
  const sizes = {
    sm: {
      padding: '10px 14px',
      fontSize: '0.875rem',
      borderRadius: '12px'
    },
    md: {
      padding: '14px 18px',
      fontSize: '0.9375rem',
      borderRadius: 'var(--radius-input)'
    }
  };
  const wrapStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    width: '100%',
    ...styleProp
  };
  const labelStyle = {
    fontFamily: 'var(--font-body)',
    fontSize: '0.8125rem',
    fontWeight: 500,
    letterSpacing: '0.01em',
    color: focused ? 'var(--color-accent)' : error ? 'var(--color-error)' : 'var(--color-text-secondary)',
    transition: 'color 200ms ease'
  };
  const inputStyle = {
    fontFamily: 'var(--font-body)',
    color: 'var(--color-text-primary)',
    background: 'var(--color-canvas)',
    border: error ? '1.5px solid var(--color-error)' : focused ? '1.5px solid var(--color-border-accent)' : '1.5px solid transparent',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
    boxShadow: focused ? 'inset 3px 3px 7px rgba(0,0,0,0.06), inset -2px -2px 5px rgba(255,255,255,0.82), 0 0 0 3px var(--color-accent-glow)' : 'inset 3px 3px 7px rgba(0,0,0,0.06), inset -2px -2px 5px rgba(255,255,255,0.82)',
    transition: 'all 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    opacity: disabled ? 0.5 : 1,
    cursor: disabled ? 'not-allowed' : 'text',
    ...sizes[size]
  };
  const metaStyle = {
    fontFamily: 'var(--font-body)',
    fontSize: '0.75rem',
    color: error ? 'var(--color-error)' : 'var(--color-text-muted)',
    paddingLeft: '4px'
  };
  return /*#__PURE__*/React.createElement("div", {
    style: wrapStyle
  }, label && /*#__PURE__*/React.createElement("label", {
    style: labelStyle
  }, label), /*#__PURE__*/React.createElement("input", _extends({
    type: type,
    placeholder: placeholder,
    value: value,
    onChange: onChange,
    disabled: disabled,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    style: inputStyle
  }, rest)), (error || hint) && /*#__PURE__*/React.createElement("span", {
    style: metaStyle
  }, error || hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Input.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Tag({
  children,
  variant = 'default',
  onRemove,
  style: styleProp,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const variants = {
    default: {
      background: 'var(--color-chrome-light)',
      color: 'var(--color-text-secondary)',
      border: '1px solid var(--color-border)'
    },
    accent: {
      background: 'var(--color-accent-subtle)',
      color: 'var(--color-accent-intense)',
      border: '1px solid var(--color-border-accent)'
    },
    chrome: {
      background: 'linear-gradient(135deg, #F2F2F0 0%, #E2E2E0 100%)',
      color: 'var(--color-text-secondary)',
      border: '1px solid rgba(195,195,193,0.5)'
    }
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      fontFamily: 'var(--font-body)',
      fontSize: '0.8125rem',
      fontWeight: 500,
      padding: '5px 12px 5px 14px',
      borderRadius: 'var(--radius-tag)',
      transition: 'opacity 150ms ease',
      opacity: hover ? 0.85 : 1,
      whiteSpace: 'nowrap',
      ...(variants[variant] || variants.default),
      ...styleProp
    }
  }, rest), children, onRemove && /*#__PURE__*/React.createElement("span", {
    onClick: e => {
      e.stopPropagation();
      onRemove();
    },
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 15,
      height: 15,
      borderRadius: '50%',
      cursor: 'pointer',
      fontSize: '13px',
      lineHeight: 1,
      opacity: 0.55,
      marginLeft: 2,
      flexShrink: 0
    },
    "aria-label": "Remove"
  }, "\xD7"));
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/core/Toggle.jsx
try { (() => {
function Toggle({
  checked = false,
  onChange,
  label,
  size = 'md',
  disabled = false,
  style: styleProp
}) {
  const sizes = {
    sm: {
      w: 34,
      h: 19,
      thumb: 13,
      offset: 3
    },
    md: {
      w: 46,
      h: 26,
      thumb: 18,
      offset: 4
    },
    lg: {
      w: 56,
      h: 32,
      thumb: 22,
      offset: 5
    }
  };
  const s = sizes[size] || sizes.md;
  return /*#__PURE__*/React.createElement("div", {
    role: "switch",
    "aria-checked": checked,
    onClick: () => !disabled && onChange && onChange(!checked),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '10px',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      userSelect: 'none',
      ...styleProp
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: s.w,
      height: s.h,
      borderRadius: 999,
      background: checked ? 'var(--color-accent)' : 'var(--color-canvas)',
      boxShadow: checked ? 'inset 2px 2px 5px rgba(0,0,0,0.14), 0 0 14px rgba(243,169,139,0.28)' : 'inset 3px 3px 6px rgba(0,0,0,0.08), inset -2px -2px 4px rgba(255,255,255,0.9)',
      transition: 'background 220ms ease, box-shadow 220ms ease',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: s.offset,
      left: checked ? s.w - s.thumb - s.offset : s.offset,
      width: s.thumb,
      height: s.thumb,
      borderRadius: '50%',
      background: checked ? '#FFFFFF' : 'linear-gradient(145deg, #FFFFFF 0%, #E8E8E6 100%)',
      boxShadow: '2px 2px 5px rgba(0,0,0,0.14), -1px -1px 3px rgba(255,255,255,0.9)',
      transition: 'left 220ms cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    }
  })), label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: '0.9375rem',
      color: 'var(--color-text-secondary)'
    }
  }, label));
}
Object.assign(__ds_scope, { Toggle });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Toggle.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Toggle = __ds_scope.Toggle;

})();
