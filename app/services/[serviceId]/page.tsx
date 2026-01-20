'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import axiosInstance from '@/lib/axios'

export default function ServiceDetail({ params }: { params: { serviceId: string } }) {
  const router = useRouter()
  const [service, setService] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchService()
  }, [])

  const fetchService = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}')
      const providerId = user.providerId || user.id

      // Get all services and find the one we need
      const response = await axiosInstance.get(`/service-provider/services/${providerId}`)
      const foundService = response.data.find((s: any) => s.serviceId === parseInt(params.serviceId))
      
      setService(foundService)
    } catch (error) {
      console.error('Failed to fetch service:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this service?')) return

    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}')
      const providerId = user.providerId || user.id

      await axiosInstance.delete(`/service-provider/service/${providerId}/${params.serviceId}`)
      alert('Service deleted successfully!')
      router.push('/services')
    } catch (error) {
      alert('Failed to delete service')
    }
  }

  if (loading) return Loading...

  if (!service) return Service not found

  return (
    
      
        
          ← Back to Services
        
      

      
        {service.serviceName}
        
          {service.description}
        
        
        
          Price: ৳{service.price}
          Category: {service.category || 'N/A'}
          Created: {new Date(service.createdAt).toLocaleDateString()}
        

        
          
            
              Edit Service
            
          
          
            Delete Service
          
        
      
    
  )
}