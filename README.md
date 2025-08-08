# VM Management Application

A React-based virtual machine management dashboard built with Vite, TypeScript, and Redux Toolkit.

## Features

- ⚡️ Fast development with Vite
- 🎯 TypeScript for type safety
- ⚛️ React 19 with modern hooks
- 🔄 Redux Toolkit for state management
- 📊 Interactive charts and data visualization
- 📱 Virtual machine management dashboard
- 🔍 Sortable VM table
- 🧙‍♂️ Multi-step wizard for VM creation
- 🔌 API service layer with DTO mapping

## Getting Started

### Prerequisites

- Node.js (version 20.19.0 or higher)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:
```bash
npm run dev
```

### Building

Build for production:
```bash
npm run build
```

### Type Checking

Run TypeScript type checking:
```bash
npm run type-check
```

### Linting

Run ESLint:
```bash
npm run lint
```

## Project Structure

```
src/
├── components/
│   ├── circle-chart/           # Circular chart component
│   ├── confirm-modal/          # Confirmation modal
│   ├── formik/                 # Form components (checkbox, input)
│   ├── header/                 # Header with account and menu
│   ├── linear-chart/           # Linear chart component
│   ├── modal/                  # Modal component
│   ├── slider/                 # Slider component
│   ├── vm-table/               # VM table with sorting
│   └── wizard/                 # Multi-step wizard for VM creation
├── constants/
│   ├── menu.ts                 # Menu configuration
│   ├── steps.ts                # Wizard steps configuration
│   └── vm-table.ts            # VM table constants
├── hooks/
│   ├── useAlertInfo.ts         # Alert information hook
│   ├── useConfirmModal.ts      # Confirmation modal hook
│   ├── useWizardConfirmation.ts # Wizard confirmation logic
│   ├── useWizardForm.ts        # Wizard form management
│   └── useWizardSteps.ts       # Wizard step navigation
├── pages/
│   ├── DashboardPage.tsx       # Main dashboard with charts and VM table
│   ├── EventsPage.tsx          # Events monitoring page
│   ├── HelpPage.tsx            # Help documentation
│   └── Faq.tsx                # FAQ page
├── services/
│   └── api/
│       └── index.ts            # API service for VM operations
├── store/
│   ├── index.ts                # Redux store configuration
│   ├── hooks.ts                # Typed Redux hooks
│   ├── types.ts                # TypeScript interfaces
│   ├── mockData.ts             # Mock data for development
│   └── slices/
│       └── vmSlice.ts          # VM state management
├── types/
│   ├── domain/
│   │   └── index.ts            # Domain models for VMs and alerts
│   ├── dto/
│   │   └── index.ts            # DTO types for API responses
│   └── mappers/
│       └── index.ts            # Mapper functions for DTO ↔ Domain conversion
├── assets/                     # Static assets and icons
├── App.tsx                     # Main App component with routing
├── main.tsx                    # Application entry point
└── vite-env.d.ts              # TypeScript declarations
```

## Domain Model Architecture

The application follows a clean domain model architecture with clear separation between:

### Domain Models (`src/types/domain/`)
- **VM**: Core virtual machine entity with state, server, CPU, memory, uptime and alerts
- **Alert**: Alert entity with type and optional count
- **VMCreateData**: Data structure for creating new VMs
- **VMState & AlertType**: Type-safe enums for VM states and alert types

### DTO Types (`src/types/dto/`)
- **VMResponseDTO**: API response structure for VMs
- **VMCreateRequestDTO**: API request structure for VM creation
- **AlertDTO**: API response structure for alerts
- **APIResponseDTO**: Generic API response wrapper

### Mapper Functions (`src/types/mappers/`)
- **mapVMResponseToDomain**: Convert VM API response to domain model
- **mapVMDomainToCreateRequest**: Convert domain model to API request
- **mapAlertDTOToDomain**: Convert alert API response to domain model
- **mapAPIResponseToDomain**: Generic API response mapper

### API Service (`src/services/api/`)
- **getVMs()**: Fetch all virtual machines
- **createVM(data)**: Create a new virtual machine
- Clean separation between API contracts and domain models

## Technologies Used

- **React 19** - UI library
- **TypeScript** - Type safety
- **Redux Toolkit** - State management
- **React Redux** - React bindings for Redux
- **React Router DOM** - Client-side routing
- **Formik** - Form management
- **Yup** - Form validation
- **Recharts** - Chart components
- **Vite** - Build tool and dev server
- **Sass** - CSS preprocessing
- **SVGR** - SVG component support

## Application Features

### Dashboard
- **VM Overview**: Display of running and stopped virtual machines
- **Performance Charts**: Circular and linear charts showing VM statistics
- **Interactive Table**: Sortable VM table with copy functionality
- **Quick Actions**: Create new VMs with the wizard

### VM Management
- **VM Table**: Displays VM ID, state, server, CPU, memory, and uptime
- **Sorting**: Sort by state, CPU, memory or uptime
- **Copy Functionality**: Copy VM IDs to clipboard
- **Status Indicators**: Visual status indicators for different VM states

### Wizard System
- **Multi-step Process**: Guided VM creation with multiple steps
- **Form Validation**: Real-time validation with Yup schemas
- **Confirmation Dialogs**: Safe navigation with unsaved changes protection

### API Integration
- **Domain-Driven Design**: Clean separation between API contracts and business logic
- **Type Safety**: Full TypeScript support for all API operations
- **Error Handling**: Proper error handling for API requests
- **Mock Data**: Development with mock data, ready for real API integration

## Development Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run type-check` - Run TypeScript type checking
- `npm run check` - Run both type checking and linting
