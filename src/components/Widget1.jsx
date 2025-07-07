import React from 'react'
import { CCol, CRow, CWidgetStatsB } from '@coreui/react'

export const WidgetStatsBExample = () => {
    return (
        <div style={{ padding: '1rem' }}>
            <CRow>
                <CCol xs={12} md={6}>
                    <CWidgetStatsB
                        className="mb-4"
                        progress={{ color: 'success', value: 75 }}
                        text="Asistencia general"
                        title="Porcentaje asistentes"
                        value="89.9%"
                    />
                </CCol>
                <CCol xs={12} md={6}>
                    <CWidgetStatsB
                        className="mb-4"
                        color="primary"
                        inverse
                        progress={{ value: 60 }}
                        text="Usuarios nuevos"
                        title="Progreso del día"
                        value="73.2%"
                    />
                </CCol>
            </CRow>
        </div>
    )
}
export default WidgetStatsBExample