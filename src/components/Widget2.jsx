import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilArrowTop, cilOptions } from '@coreui/icons'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'

import {
    CCol,
    CDropdown,
    CDropdownItem,
    CDropdownMenu,
    CDropdownToggle,
    CRow,
    CWidgetStatsA,
} from '@coreui/react'

export const WidgetStatsAExample = () => {
    return (
        <CRow>
            {/* Widget 1 */}
            <CCol sm={6}>
                <CWidgetStatsA
                    className="mb-4"
                    color="primary"
                    value={
                        <>
                            $9.000{' '}
                            <span className="fs-6 fw-normal">
                                (40.9% <CIcon icon={cilArrowTop} />)
                            </span>
                        </>
                    }
                    title="Widget title"
                    action={
                        <CDropdown alignment="end">
                            <CDropdownToggle color="transparent" caret={false} className="p-0">
                                <CIcon icon={cilOptions} className="text-white" />
                            </CDropdownToggle>
                            <CDropdownMenu>
                                <CDropdownItem>Action</CDropdownItem>
                                <CDropdownItem>Another action</CDropdownItem>
                                <CDropdownItem>Something else here...</CDropdownItem>
                                <CDropdownItem disabled>Disabled action</CDropdownItem>
                            </CDropdownMenu>
                        </CDropdown>
                    }
                    chart={
                        <CChartLine
                            className="mt-3 mx-3"
                            style={{ height: '70px' }}
                            data={{
                                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                                datasets: [
                                    {
                                        label: 'My First dataset',
                                        backgroundColor: 'transparent',
                                        borderColor: 'rgba(255,255,255,.55)',
                                        pointBackgroundColor: '#5856d6',
                                        data: [65, 59, 84, 84, 51, 55, 40],
                                    },
                                ],
                            }}
                            options={{
                                plugins: {
                                    legend: {
                                        display: false,
                                    },
                                },
                                maintainAspectRatio: false,
                                scales: {
                                    x: {
                                        border: {
                                            display: false,
                                        },
                                        grid: {
                                            display: false,
                                        },
                                        ticks: {
                                            display: false,
                                        },
                                    },
                                    y: {
                                        min: 30,
                                        max: 89,
                                        display: false,
                                        grid: {
                                            display: false,
                                        },
                                        ticks: {
                                            display: false,
                                        },
                                    },
                                },
                                elements: {
                                    line: {
                                        borderWidth: 1,
                                        tension: 0.4,
                                    },
                                    point: {
                                        radius: 4,
                                        hitRadius: 10,
                                        hoverRadius: 4,
                                    },
                                },
                            }}
                        />
                    }
                />
            </CCol>
            <CCol sm={6}>
                <CWidgetStatsA
                    className="mb-4"
                    style={{ backgroundColor: '#fff', color: '#000' }} // fondo blanco, texto lila
                    value={
                        <>
                            $9.000{' '}
                            <span className="fs-6 fw-normal">
                                (40.9% <CIcon icon={cilArrowTop} style={{ color: '#6f42c1' }} />)
                            </span>
                        </>
                    }
                    title="Ingresos Totales"
                    action={
                        <CDropdown alignment="end">
                            <CDropdownToggle color="transparent" caret={false} className="p-0">
                                <CIcon icon={cilOptions} style={{ color: '#6f42c1' }} />
                            </CDropdownToggle>
                            <CDropdownMenu>
                                <CDropdownItem>Detalle</CDropdownItem>
                                <CDropdownItem>Exportar</CDropdownItem>
                            </CDropdownMenu>
                        </CDropdown>
                    }
                    chart={
                        <CChartLine
                            className="mt-3 mx-3"
                            style={{ height: '70px' }}
                            data={{
                                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                                datasets: [
                                    {
                                        label: 'Ingresos',
                                        backgroundColor: 'transparent',
                                        borderColor: '#0d6efd', // línea lila
                                        pointBackgroundColor: '#0d6efd',
                                        data: [65, 59, 84, 84, 51, 55, 40],
                                    },
                                ],
                            }}
                            options={{
                                plugins: { legend: { display: false } },
                                maintainAspectRatio: false,
                                scales: {
                                    x: {
                                        grid: { display: false },
                                        ticks: { display: false },
                                    },
                                    y: {
                                        grid: { display: false },
                                        ticks: { display: false },
                                        min: 30,
                                        max: 89,
                                    },
                                },
                                elements: {
                                    line: { borderWidth: 2, tension: 0.4 },
                                    point: { radius: 3, hitRadius: 10 },
                                },
                            }}
                        />
                    }
                />
            </CCol>
            {/* Widget 2 */}
            <CCol sm={6}>
                <CWidgetStatsA
                    className="mb-4"
                    color="info"
                    value={
                        <>
                            $9.000{' '}
                            <span className="fs-6 fw-normal">
                                (40.9% <CIcon icon={cilArrowTop} />)
                            </span>
                        </>
                    }
                    title="Widget title"
                    action={
                        <CDropdown alignment="end">
                            <CDropdownToggle color="transparent" caret={false} className="p-0">
                                <CIcon icon={cilOptions} className="text-white" />
                            </CDropdownToggle>
                            <CDropdownMenu>
                                <CDropdownItem>Action</CDropdownItem>
                                <CDropdownItem>Another action</CDropdownItem>
                                <CDropdownItem>Something else here...</CDropdownItem>
                                <CDropdownItem disabled>Disabled action</CDropdownItem>
                            </CDropdownMenu>
                        </CDropdown>
                    }
                    chart={
                        <CChartLine
                            className="mt-3 mx-3"
                            style={{ height: '70px' }}
                            data={{
                                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                                datasets: [
                                    {
                                        label: 'My First dataset',
                                        backgroundColor: 'transparent',
                                        borderColor: 'rgba(255,255,255,.55)',
                                        pointBackgroundColor: '#39f',
                                        data: [1, 18, 9, 17, 34, 22, 11],
                                    },
                                ],
                            }}
                            options={{
                                plugins: {
                                    legend: {
                                        display: false,
                                    },
                                },
                                maintainAspectRatio: false,
                                scales: {
                                    x: {
                                        border: {
                                            display: false,
                                        },
                                        grid: {
                                            display: false,
                                        },
                                        ticks: {
                                            display: false,
                                        },
                                    },
                                    y: {
                                        min: -9,
                                        max: 39,
                                        display: false,
                                        grid: {
                                            display: false,
                                        },
                                        ticks: {
                                            display: false,
                                        },
                                    },
                                },
                                elements: {
                                    line: {
                                        borderWidth: 1,
                                    },
                                    point: {
                                        radius: 4,
                                        hitRadius: 10,
                                        hoverRadius: 4,
                                    },
                                },
                            }}
                        />
                    }
                />
            </CCol>
            <CCol sm={6}>
                <CWidgetStatsA
                    className="mb-4"
                    style={{ backgroundColor: '#fff', color: '#000' }}
                    value={
                        <>
                            $9.000{' '}
                            <span className="fs-6 fw-normal">
                                (40.9% <CIcon icon={cilArrowTop} style={{ color: '#0d6efd' }} />)
                            </span>
                        </>
                    }
                    title="Ingresos Totales"
                    action={
                        <CDropdown alignment="end">
                            <CDropdownToggle color="transparent" caret={false} className="p-0">
                                <CIcon icon={cilOptions} style={{ color: '#0d6efd' }} />
                            </CDropdownToggle>
                            <CDropdownMenu>
                                <CDropdownItem>Action</CDropdownItem>
                                <CDropdownItem>Another action</CDropdownItem>
                                <CDropdownItem>Something else here...</CDropdownItem>
                                <CDropdownItem disabled>Disabled action</CDropdownItem>
                            </CDropdownMenu>
                        </CDropdown>
                    }
                    chart={
                        <CChartLine
                            className="mt-3 mx-3"
                            style={{ height: '70px' }}
                            data={{
                                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                                datasets: [
                                    {
                                        label: 'Ingresos',
                                        backgroundColor: 'transparent',
                                        borderColor: '#0d6efd',
                                        pointBackgroundColor: '#0d6efd',
                                        data: [1, 18, 9, 17, 34, 22, 11],
                                    },
                                ],
                            }}
                            options={{
                                plugins: { legend: { display: false } },
                                maintainAspectRatio: false,
                                scales: {
                                    x: {
                                        grid: { display: false },
                                        ticks: { display: false },
                                    },
                                    y: {
                                        grid: { display: false },
                                        ticks: { display: false },
                                        min: -9,
                                        max: 39,
                                    },
                                },
                                elements: {
                                    line: { borderWidth: 2 },
                                    point: { radius: 4, hitRadius: 10, hoverRadius: 4 },
                                },
                            }}
                        />
                    }
                />
            </CCol>
            {/* Widget 3  */}
            <CCol sm={6}>
                <CWidgetStatsA
                    className="mb-4"
                    color="warning"
                    value={
                        <>
                            $9.000{' '}
                            <span className="fs-6 fw-normal">
                                (40.9% <CIcon icon={cilArrowTop} />)
                            </span>
                        </>
                    }
                    title="Widget title"
                    action={
                        <CDropdown alignment="end">
                            <CDropdownToggle color="transparent" caret={false} className="p-0">
                                <CIcon icon={cilOptions} className="text-white" />
                            </CDropdownToggle>
                            <CDropdownMenu>
                                <CDropdownItem>Action</CDropdownItem>
                                <CDropdownItem>Another action</CDropdownItem>
                                <CDropdownItem>Something else here...</CDropdownItem>
                                <CDropdownItem disabled>Disabled action</CDropdownItem>
                            </CDropdownMenu>
                        </CDropdown>
                    }
                    chart={
                        <CChartLine
                            className="mt-3"
                            style={{ height: '70px' }}
                            data={{
                                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                                datasets: [
                                    {
                                        label: 'My First dataset',
                                        backgroundColor: 'rgba(255,255,255,.2)',
                                        borderColor: 'rgba(255,255,255,.55)',
                                        data: [78, 81, 80, 45, 34, 12, 40],
                                        fill: true,
                                    },
                                ],
                            }}
                            options={{
                                plugins: {
                                    legend: {
                                        display: false,
                                    },
                                },
                                maintainAspectRatio: false,
                                scales: {
                                    x: {
                                        display: false,
                                    },
                                    y: {
                                        display: false,
                                    },
                                },
                                elements: {
                                    line: {
                                        borderWidth: 2,
                                        tension: 0.4,
                                    },
                                    point: {
                                        radius: 0,
                                        hitRadius: 10,
                                        hoverRadius: 4,
                                    },
                                },
                            }}
                        />
                    }
                />
            </CCol>
            <CCol sm={6}>
                <CWidgetStatsA
                    className="mb-4"
                    style={{ backgroundColor: '#fff', color: '#000' }} // blanco + amarillo warning
                    value={
                        <>
                            $9.000{' '}
                            <span className="fs-6 fw-normal">
                                (40.9% <CIcon icon={cilArrowTop} style={{ color: '#0d6efd' }} />)
                            </span>
                        </>
                    }
                    title="Ingresos Esperados"
                    action={
                        <CDropdown alignment="end">
                            <CDropdownToggle color="transparent" caret={false} className="p-0">
                                <CIcon icon={cilOptions} style={{ color: '#0d6efd' }} />
                            </CDropdownToggle>
                            <CDropdownMenu>
                                <CDropdownItem>Action</CDropdownItem>
                                <CDropdownItem>Another action</CDropdownItem>
                                <CDropdownItem>Something else here...</CDropdownItem>
                                <CDropdownItem disabled>Disabled action</CDropdownItem>
                            </CDropdownMenu>
                        </CDropdown>
                    }
                    chart={
                        <CChartLine
                            className="mt-3"
                            style={{ height: '70px' }}
                            data={{
                                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                                datasets: [
                                    {
                                        label: 'Proyecciones',
                                        backgroundColor: 'rgba(13, 110, 253, 0.2)',  // azul con transparencia
                                        borderColor: 'rgba(13, 110, 253, 0.8)', // línea amarilla
                                        data: [78, 81, 80, 45, 34, 12, 40],
                                        fill: true,
                                    },
                                ],
                            }}
                            options={{
                                plugins: { legend: { display: false } },
                                maintainAspectRatio: false,
                                scales: {
                                    x: {
                                        display: false,
                                    },
                                    y: {
                                        display: false,
                                    },
                                },
                                elements: {
                                    line: {
                                        borderWidth: 2,
                                        tension: 0.4,
                                    },
                                    point: {
                                        radius: 0,
                                        hitRadius: 10,
                                        hoverRadius: 4,
                                    },
                                },
                            }}
                        />
                    }
                />
            </CCol>
            {/* Widget 4 */}
            <CCol sm={6}>
                <CWidgetStatsA
                    className="mb-4"
                    color="danger"
                    value={
                        <>
                            $9.000{' '}
                            <span className="fs-6 fw-normal">
                                (40.9% <CIcon icon={cilArrowTop} />)
                            </span>
                        </>
                    }
                    title="Widget title"
                    action={
                        <CDropdown alignment="end">
                            <CDropdownToggle color="transparent" caret={false} className="p-0">
                                <CIcon icon={cilOptions} className="text-white" />
                            </CDropdownToggle>
                            <CDropdownMenu>
                                <CDropdownItem>Action</CDropdownItem>
                                <CDropdownItem>Another action</CDropdownItem>
                                <CDropdownItem>Something else here...</CDropdownItem>
                                <CDropdownItem disabled>Disabled action</CDropdownItem>
                            </CDropdownMenu>
                        </CDropdown>
                    }
                    chart={
                        <CChartBar
                            className="mt-3 mx-3"
                            style={{ height: '70px' }}
                            data={{
                                labels: [
                                    'January',
                                    'February',
                                    'March',
                                    'April',
                                    'May',
                                    'June',
                                    'July',
                                    'August',
                                    'September',
                                    'October',
                                    'November',
                                    'December',
                                    'January',
                                    'February',
                                    'March',
                                    'April',
                                ],
                                datasets: [
                                    {
                                        label: 'My First dataset',
                                        backgroundColor: 'rgba(255,255,255,.2)',
                                        borderColor: 'rgba(255,255,255,.55)',
                                        data: [78, 81, 80, 45, 34, 12, 40, 85, 65, 23, 12, 98, 34, 84, 67, 82],
                                        barPercentage: 0.6,
                                    },
                                ],
                            }}
                            options={{
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: {
                                        display: false,
                                    },
                                },
                                scales: {
                                    x: {
                                        grid: {
                                            display: false,
                                            drawTicks: false,
                                        },
                                        ticks: {
                                            display: false,
                                        },
                                    },
                                    y: {
                                        border: {
                                            display: false,
                                        },
                                        grid: {
                                            display: false,
                                            drawTicks: false,
                                        },
                                        ticks: {
                                            display: false,
                                        },
                                    },
                                },
                            }}
                        />
                    }
                />
            </CCol>
            <CCol sm={6}>
                <CWidgetStatsA
                    className="mb-4"
                    // Quitamos color="danger" para personalizar colores manualmente
                    style={{
                        backgroundColor: '#fff',      // Fondo blanco
                        color: '#000',             // Texto rojo
                        border: '1px solid #0d6efd', // Opcional: borde rojo para resaltar
                    }}
                    value={
                        <>
                            $9.000{' '}
                            <span className="fs-6 fw-normal" style={{ color: '#0d6efd' }}>
                                (40.9% <CIcon icon={cilArrowTop} style={{ color: '#0d6efd' }} />)
                            </span>
                        </>
                    }
                    title={<span style={{ color: '#0d6efd' }}>Widget title</span>}
                    action={
                        <CDropdown alignment="end">
                            <CDropdownToggle color="transparent" caret={false} className="p-0">
                                <CIcon icon={cilOptions} style={{ color: '#0d6efd' }} />
                            </CDropdownToggle>
                            <CDropdownMenu>
                                <CDropdownItem>Action</CDropdownItem>
                                <CDropdownItem>Another action</CDropdownItem>
                                <CDropdownItem>Something else here...</CDropdownItem>
                                <CDropdownItem disabled>Disabled action</CDropdownItem>
                            </CDropdownMenu>
                        </CDropdown>
                    }
                    chart={
                        <CChartBar
                            className="mt-3 mx-3"
                            style={{ height: '70px' }}
                            data={{
                                labels: [
                                    'January', 'February', 'March', 'April', 'May', 'June', 'July',
                                    'August', 'September', 'October', 'November', 'December',
                                    'January', 'February', 'March', 'April',
                                ],
                                datasets: [
                                    {
                                        label: 'My First dataset',
                                        backgroundColor: 'rgba(13, 110, 253, 0.2)',  // azul con transparencia
                                        borderColor: 'rgba(13, 110, 253, 0.8)',
                                        data: [78, 81, 80, 45, 34, 12, 40, 85, 65, 23, 12, 98, 34, 84, 67, 82],
                                        barPercentage: 0.6,
                                    },
                                ],
                            }}
                            options={{
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: { display: false },
                                },
                                scales: {
                                    x: {
                                        grid: { display: false, drawTicks: false },
                                        ticks: { display: false },
                                    },
                                    y: {
                                        border: { display: false },
                                        grid: { display: false, drawTicks: false },
                                        ticks: { display: false },
                                    },
                                },
                            }}
                        />
                    }
                />
            </CCol>

        </CRow>
    )
}

export default WidgetStatsAExample