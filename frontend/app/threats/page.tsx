'use client'

import Link from 'next/link'
import { Shield, AlertTriangle, ArrowLeft } from 'lucide-react'

export default function ThreatsPage() {
  // Navigation Header Component - Updated with industry standard layout
  const NavigationHeader = () => (
    <nav className="bg-gray-800 shadow-xl border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-6">
            {/* Back to Home on the left */}
            <Link href="/" className="nav-link flex items-center">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Home
            </Link>
            {/* Threat Intelligence on the left */}
            <span className="text-white font-semibold border-l border-gray-600 pl-6">
              Threat Intelligence
            </span>
          </div>
          <div className="flex items-center space-x-6">
            <Link href="/security-assessment" className="nav-link">
              Security Assessment
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )

  // Sample threat data
  const currentThreats = [
    {
      id: 1,
      title: 'WhatsApp Business Account Hijacking',
      severity: 'High',
      description: 'Attackers are targeting business WhatsApp accounts by pretending to be customers and sending verification codes. Once they gain access, they message your contacts for payments.',
      recommendation: 'Never share your WhatsApp verification code with anyone. Enable two-step verification in WhatsApp settings.',
      affected: ['Retail businesses', 'Service providers', 'Online sellers']
    },
    {
      id: 2,
      title: 'Fake Bank Alert Scams',
      severity: 'High',
      description: 'Scammers are using manipulated bank alert screenshots or SMS to convince businesses that payments have been made. Products are released before actual funds arrive.',
      recommendation: 'Always verify transactions directly through your bank app or USSD code before releasing goods.',
      affected: ['All businesses accepting transfers']
    },
    {
      id: 3,
      title: 'Vendor Impersonation Fraud',
      severity: 'Medium',
      description: 'Fraudsters are impersonating legitimate vendors and sending fake invoices with changed bank account details.',
      recommendation: 'Always verify payment details directly with vendors using previously established contact methods.',
      affected: ['Businesses with regular suppliers']
    },
    {
      id: 4,
      title: 'Phishing Email Attacks',
      severity: 'Medium',
      description: 'Targeted email campaigns pretending to be from banks, government agencies, or business partners requesting sensitive information.',
      recommendation: 'Verify sender email addresses and never click suspicious links. Contact organizations directly through official channels.',
      affected: ['All businesses with email communication']
    }
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'high':
        return 'bg-red-500/20 text-red-400 border-red-500';
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500';
      case 'low':
        return 'bg-green-500/20 text-green-400 border-green-500';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500';
    }
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <NavigationHeader />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="h-8 w-8 text-red-400" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Current Threat Intelligence
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Stay informed about the latest digital threats targeting Nigerian businesses. 
            Updated regularly with actionable protection advice.
          </p>
        </div>

        {/* Threat Alerts Grid */}
        <div className="grid gap-6 max-w-6xl mx-auto">
          {currentThreats.map((threat) => (
            <div key={threat.id} className="card hover:shadow-lg transition-shadow duration-200">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4">
                <h3 className="text-xl font-semibold text-white mb-2 sm:mb-0">
                  {threat.title}
                </h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getSeverityColor(threat.severity)}`}>
                  {threat.severity} Risk
                </span>
              </div>
              
              <p className="text-gray-300 mb-4">
                {threat.description}
              </p>
              
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-white mb-2">Protection Recommendation:</h4>
                <p className="text-green-400 bg-green-500/10 p-3 rounded-lg">
                  {threat.recommendation}
                </p>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold text-white mb-2">Commonly Affected:</h4>
                <div className="flex flex-wrap gap-2">
                  {threat.affected.map((item, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Resources */}
        <div className="max-w-6xl mx-auto mt-12">
          <div className="card text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Need Immediate Help?</h3>
            <p className="text-gray-300 mb-6">
              If you suspect your business has been targeted by any of these threats, 
              take immediate action to secure your accounts and contact your bank.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/security-assessment" 
                className="btn btn-primary"
              >
                Run Security Assessment
              </Link>
              <button className="btn btn-secondary">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
