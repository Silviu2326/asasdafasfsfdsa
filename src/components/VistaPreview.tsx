import React from 'react';

interface StyleConfig {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
    success: string;
    warning: string;
    error: string;
    info: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  borderRadius: {
    none: string;
    sm: string;
    md: string;
    lg: string;
    full: string;
  };
  animation: {
    duration: string;
    easing: string;
  };
  shadow: {
    none: string;
    sm: string;
    md: string;
    lg: string;
  };
}

interface VistaPreviewProps {
  styles: StyleConfig;
  font: string;
}

const VistaPreview: React.FC<VistaPreviewProps> = ({ styles, font }) => {
  const getButtonStyles = (color: string) => ({
    backgroundColor: color,
    color: styles.colors.background,
    fontFamily: font,
    padding: `${styles.spacing.sm} ${styles.spacing.md}`,
    borderRadius: styles.borderRadius.md,
    transition: `all ${styles.animation.duration} ${styles.animation.easing}`,
    boxShadow: styles.shadow.md,
  });

  const getCardStyles = (bgColor: string = styles.colors.background) => ({
    backgroundColor: bgColor,
    color: styles.colors.text,
    fontFamily: font,
    padding: styles.spacing.lg,
    borderRadius: styles.borderRadius.lg,
    boxShadow: styles.shadow.md,
    transition: `all ${styles.animation.duration} ${styles.animation.easing}`,
  });

  return (
    <div className="bg-white rounded-xl shadow-lg p-6" style={{ fontFamily: font }}>
      <h3 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b">Vista Previa</h3>
      
      <div className="space-y-8">
        {/* Botones */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-600">Botones</h4>
          <div className="space-y-2">
            <div className="flex gap-2">
              <button style={getButtonStyles(styles.colors.primary)}>
                Botón Primario
              </button>
              <button style={getButtonStyles(styles.colors.secondary)}>
                Botón Secundario
              </button>
            </div>
            <button 
              style={{
                ...getButtonStyles('transparent'),
                border: `2px solid ${styles.colors.primary}`,
                color: styles.colors.primary,
              }}
            >
              Botón Outline
            </button>
          </div>
        </div>

        {/* Tarjetas */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-600">Tarjetas</h4>
          <div className="grid grid-cols-2 gap-4">
            <div style={getCardStyles(styles.colors.primary)}>
              <h5 className="font-semibold mb-2" style={{ color: styles.colors.background }}>
                Tarjeta Principal
              </h5>
              <p className="text-sm opacity-90" style={{ color: styles.colors.background }}>
                Contenido de ejemplo con un diseño moderno y atractivo.
              </p>
            </div>
            <div style={{
              ...getCardStyles(),
              border: `1px solid ${styles.colors.secondary}`
            }}>
              <h5 className="font-semibold mb-2">Tarjeta Normal</h5>
              <p className="text-sm">Contenido de ejemplo con un diseño moderno y atractivo.</p>
            </div>
          </div>
        </div>

        {/* Alertas */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-600">Alertas</h4>
          <div className="space-y-2">
            {[
              { type: 'success', text: 'Operación exitosa' },
              { type: 'warning', text: 'Advertencia importante' },
              { type: 'error', text: 'Error en la operación' },
              { type: 'info', text: 'Información relevante' }
            ].map((alert) => (
              <div
                key={alert.type}
                style={{
                  backgroundColor: `${styles.colors[alert.type]}15`,
                  borderLeft: `4px solid ${styles.colors[alert.type]}`,
                  padding: `${styles.spacing.sm} ${styles.spacing.md}`,
                  borderRadius: styles.borderRadius.sm,
                  fontFamily: font,
                  color: styles.colors[alert.type],
                  transition: `all ${styles.animation.duration} ${styles.animation.easing}`,
                }}
              >
                <p className="text-sm font-medium">{alert.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Badges */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-600">Badges</h4>
          <div className="flex flex-wrap gap-2">
            {Object.entries(styles.colors).slice(0, 4).map(([key, value]) => (
              <span
                key={key}
                style={{
                  backgroundColor: value,
                  color: styles.colors.background,
                  padding: `${styles.spacing.xs} ${styles.spacing.sm}`,
                  borderRadius: styles.borderRadius.full,
                  fontFamily: font,
                  fontSize: '0.75rem',
                  transition: `all ${styles.animation.duration} ${styles.animation.easing}`,
                }}
              >
                Badge {key}
              </span>
            ))}
          </div>
        </div>

        {/* Inputs */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-600">Campos de Entrada</h4>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Campo de texto"
              style={{
                width: '100%',
                padding: `${styles.spacing.sm} ${styles.spacing.md}`,
                borderRadius: styles.borderRadius.md,
                border: `1px solid ${styles.colors.secondary}`,
                fontFamily: font,
                transition: `all ${styles.animation.duration} ${styles.animation.easing}`,
              }}
            />
            <select
              style={{
                width: '100%',
                padding: `${styles.spacing.sm} ${styles.spacing.md}`,
                borderRadius: styles.borderRadius.md,
                border: `1px solid ${styles.colors.secondary}`,
                fontFamily: font,
                transition: `all ${styles.animation.duration} ${styles.animation.easing}`,
              }}
            >
              <option>Opción 1</option>
              <option>Opción 2</option>
              <option>Opción 3</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VistaPreview;