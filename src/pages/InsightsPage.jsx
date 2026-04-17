import { useState } from 'react'
import { useInsights } from '../hooks/useInsights'
import { useCountries } from '../hooks/useMeta'
import StatCards from '../components/insights/StatCards'
import SalaryChart from '../components/insights/SalaryChart'
import DistributionChart from '../components/insights/DistributionChart'
import HeadcountChart from '../components/insights/HeadcountChart'
import TopRolesTable from '../components/insights/TopRolesTable'
import RecentHiresTable from '../components/insights/RecentHiresTable'
import LoadingSpinner from '../components/shared/LoadingSpinner'
import ErrorAlert from '../components/shared/ErrorAlert'
import { getCountryName } from '../utils/countryNames'
import { getCountryCurrency } from '../utils/countryNames'

function InsightsPage() {
  const [country, setCountry] = useState('')
  const { data: countriesData } = useCountries()
  const { data, isLoading, isError } = useInsights(country ? { country } : {})

  if (isLoading) return <LoadingSpinner message="Loading insights..." />
  if (isError) return <ErrorAlert message="Failed to load insights. Please try again." />

  return (
    <div>
      <div className="page-header">
        <div>
          <h4 className="fw-semibold mb-1">Salary Insights</h4>
          <p className="text-muted mb-0" style={{ fontSize: '14px' }}>
            Real-time salary analytics across your organisation
          </p>
        </div>
        <select
          className="form-select"
          style={{ width: '200px' }}
          value={country}
          onChange={e => setCountry(e.target.value)}
        >
          <option value="">All countries</option>
          {countriesData?.countries?.map(c => (
            <option key={c} value={c}>{getCountryName(c)}</option>
          ))}
        </select>
      </div>

      <StatCards
        data={data?.salary_by_country}
        currency={country ? getCountryCurrency(country) : 'USD'}
        country={country}
      />

      <div className="row g-3 mb-4">
        <div className="col-md-8">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <h6 className="fw-semibold mb-1">Average salary by job title</h6>
              <p className="text-muted mb-3" style={{ fontSize: '12px' }}>
                Top 10 roles by average compensation
              </p>
              <SalaryChart data={data?.salary_by_job_title} />
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <h6 className="fw-semibold mb-1">Top 5 paid roles</h6>
              <p className="text-muted mb-3" style={{ fontSize: '12px' }}>
                Highest average compensation
              </p>
              <TopRolesTable
                data={data?.top_paid_roles}
                currency={country ? getCountryCurrency(country) : 'USD'}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-md-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <h6 className="fw-semibold mb-1">Salary distribution</h6>
              <p className="text-muted mb-3" style={{ fontSize: '12px' }}>
                Headcount per salary band
              </p>
              <DistributionChart data={data?.salary_distribution} />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <h6 className="fw-semibold mb-1">Headcount by department</h6>
              <p className="text-muted mb-3" style={{ fontSize: '12px' }}>
                Active employees per department
              </p>
              <HeadcountChart data={data?.headcount_by_department} />
            </div>
          </div>
        </div>
      </div>

      <div className="row g-3">
        <div className="col-12">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h6 className="fw-semibold mb-1">Recent hires</h6>
              <p className="text-muted mb-3" style={{ fontSize: '12px' }}>
                Employees who joined in the last 90 days
              </p>
              <RecentHiresTable data={data?.recent_hires} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InsightsPage